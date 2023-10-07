import { GithubUser } from "./GithubUser.js";

//classe que vai organizar os dados
export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root);
    this.load();
  }

  load() {
  this.entries = JSON.parse(localStorage.getItem("@github-favorites:")) || [];
}

  save() {
    localStorage.setItem("@github-favorites:", JSON.stringify(this.entries));
  }

  async add(username) {
    try {
      const userExists = this.entries.find(entry => entry.login === username)
     
      if(userExists) {
        throw new Error('Usuário já cadastrado')
      }

      const user = await GithubUser.search(username);
      
      if (user.login === undefined) {
        throw new Error("Usuário não encontrado");
      }

      this.entries = [user, ...this.entries];
      this.update();
      this.save();
    } catch (error) {
      alert(error.message);
    }
  }

  delete(user) {
    //Higher order functions(map, filter, reduce)
    const filteredEntries = this.entries.filter(
      (entry) => entry.login !== user.login
    );

    this.entries = filteredEntries;
    this.update();
    this.save();
  }
}

//class que vai criar a visualização e eventos do html
export class FavoritesView extends Favorites {
  constructor(root) {
    super(root);

    this.tbody = this.root.querySelector("table tbody");

    this.update();
    this.onadd();
  }

  onadd() {
    const addButton = this.root.querySelector(".search button");
    addButton.onclick = () => {
      const { value } = this.root.querySelector(".search input");

      this.add(value);
    };
  }

  update() {
    this.removeAllTr();

    this.entries.forEach(user => {
      const row = this.createRow();

      row.querySelector(".user img").src = `https://github.com/${user.login}.png`;
      row.querySelector(".user img").alt = `Imagem de ${user.name}`;
      row.querySelector(".user a").href = `https://github.com/${user.login}`;
      row.querySelector(".user p").textContent = user.name;
      row.querySelector(".user span").textContent = user.login;
      row.querySelector(".repositories").textContent = user.public_repos;
      row.querySelector(".followers").textContent = user.followers;

      row.querySelector(".remove").onclick = () => {
        const isOk = confirm("Tem certeza que deseja deletar essa linha?");
        if (isOk) {
          this.delete(user);
        }
      };

      this.tbody.append(row); 
    });
  }

  createRow() {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td class="user">
        <img src="https://github.com/diego3g.png" alt="imagem de diego3g">
        <a href="https://github.com/diego3g" target="_blank">
          <p>Diego Fernanades</p>
          <span>diego3g</span>
        </a>
      </td>
      <td class="repositories"> 48 </td>
      <td class="followers"> 22503 </td>
      <td>
        <button class="remove">&times;</button>
      </td>
    `;

    return tr;
  }

  removeAllTr() {
    this.tbody.querySelectorAll("tr").forEach((tr) => {
      tr.remove();
    });
  }
}
/*import { GithubUser } from "./GithubUser.js";

export class Favorites{
    constructor(root){
        this.root = document.querySelector(root)
        this.load()
    }

    load(){
        this.entries = JSON.parse(localStorage.getItem
        ('@github-favorites:')) || []
    }

    save(){
        localStorage.setItem('@github-favorites:', JSON.stringify(this.entries))
    }

    async add(username){
        try{
            const userExists = this.entries.find(entry => entry.login === username)
            if(userExists){
                throw new Error('Usuário já cadastrado')
            }

            const user = await GithubUser.search(username)
                
            if(user.login === undefined){
                throw new Error('Usuário não encontrado!')
            }

            this.entries = [user, ...this.entries]
            this.update()
            this.save()

        } catch(error){
            alert(error.message)
        }

    }

    delete(user){
        const filteredEntries = this.entries
        .filter(entry => entry.login !== user.login)

        this.entries = filteredEntries
        this.update()
        this.save()
        

    }
}

export class FavoritesView extends Favorites{
    constructor(root){
        super(root)

         this.tbody = this.root.querySelector('table tbody')


        this.update()
        this.onadd()
    }

    onadd(){
        const addButton = this.root.querySelector('.search button')
        addButton.onclick = () => {
            const { value } = this.root.querySelector('.search input')
            this.add(value)
        }
    }

    update(){
       this.removeAllTr()

       

        this.entries.forEach(user => {
            const row =  this.createRow()

            row.querySelector('.user img').src = `https://github.com/${user.login}.png`
            row.querySelector('.user img').alt = `Imagem de ${user.name}`
            row.querySelector('.user p').textContent = user.name
            row.querySelector('.user a').href = `https://github.com/${user.login}`
            row.querySelector('.user span').textContent = user.login
            row.querySelector('.repositories').textContent = user.public_repos
            row.querySelector('.followers').textContent = user.followers

            row.querySelector('.remove').onclick = () => {
                const isOk = confirm('Tem certeza que deseja deletar essa linha?')
                if(isOk){
                    this.delete(user)
                }
            }

            this.tbody.append(row)
        })
        
    }

    createRow(){
        const tr = document.createElement('tr')

        tr.innerHTML = `

            <td class="user">
                 <img src="https://github.com/pachecx.png" alt="foto de matheus pacheco">
                 <a href="https://github.com/pachecx" target="_blank">
                     <p>Matheus Pacheco</p>
                     <span>Pachecx</span>
                 </a>
             </td>
             <td class="repositories">
                 76
             </td>
             <td class="fallowers">
                 9589
             </td>
             <td>
                 <button class="remove">&times;</button>
            </td>
        
        `
        return tr
    }

    removeAllTr(){

        this.tbody.querySelectorAll('tr')
        .forEach((tr) => {
            tr.remove()
        })
    }
}*/