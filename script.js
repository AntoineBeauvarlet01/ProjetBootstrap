const listeGens = [
	{
		title: "Antoine BEAUVARLET",
		year: 2002,
		imageUrl:
			"https://media.licdn.com/dms/image/v2/D4E03AQFGdQMeagwCAQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1693301648944?e=1738195200&v=beta&t=Jd79TpXHLT5takDIFlQdj2mmS3bO2K4dZJgy2Rl0e-s",
	},
	{
		title: "Nicolas Sarkozy",
		year: 1955,
		imageUrl:
			"https://meridian-site.s3.us-east-2.amazonaws.com/wp-content/uploads/2015/04/Nicolas_Sarkozy.jpg",
	},
	{
		title: "Jean Lassalle",
		year: 1955,
		imageUrl:
			"https://engagement-animaux.fr/wp-content/uploads/2022/02/1200px-Jean_Lassalle_02_V2.jpg",
	},
	{
		title: "Jean-Luc Mélenchon",
		year: 1951,
		imageUrl:
			"https://i.f1g.fr/media/cms/704x396_cropupscale/2024/11/28/4ef1ea8437c28cbdd2bf2a877cdda5a176d595f5e89bef20c0d0c13a573ba2f5.jpg",
	},
	{
		title: "François Hollande",
		year: 1954,
		imageUrl:
			"https://scontent-cdg4-2.xx.fbcdn.net/v/t39.30808-6/319502820_2157277084454220_8216667403573444768_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=L-_0WV2TMT8Q7kNvgEC554D&_nc_zt=23&_nc_ht=scontent-cdg4-2.xx&_nc_gid=AIHouTmJg-m3VtKBUfbdKok&oh=00_AYBqQHbMhmNEDCis64GnSSzM5d-B9vRYxZNoWkFiNPQFOQ&oe=674FBA7F",
	},
	{
		title: "Philippe Poutou",
		year: 1967,
		imageUrl:
			"https://www.francebleu.fr/s3/cruiser-production-eu3/2024/06/fae00e8d-042b-46d9-bc0f-0f518b8ca3b0/1200x680_sc_poutou.webp",
	},

]

/*  DOM ELEMENTS  */
const articleContainer = document.querySelector(".row")
/*  modal  */
const modalTitle = document.querySelector(".modal-title")
const modalBody = document.querySelector(".modal-body")
const modalFooter = document.querySelector(".modal-footer")

listeGens.forEach((personne) => {
	articleContainer.innerHTML += `
    <article class="col">
       <div class="card shadow-sm" style="background-color: #F0E68C">
          <img src="${personne.imageUrl}" class="card-img-top" alt="${personne.title}">
          <div class="card-body">
              <h3 class="card-title">${personne.title}</h3>
              <p class="card-text">Year: ${personne.year}</p>
              <div class="btn-group">
                <button
                    type="button"
                    class="btn btn-sm btn-outline-dark view"
                    data-bs-toggle="modal"
			        data-bs-target="#personneModal"
					style="background-color: #5ee1f3"
                >
                    View
                </button>
                <button
                    type="button"
                    class="btn btn-sm btn-outline-dark edit"
                    data-bs-toggle="modal"
			        data-bs-target="#personneModal"
					style="background-color: #5ee1f3"
                >
                    Edit
                </button>
            </div>
          </div>
       </div>    
    </article>

    `
})

/* ELEMENT DYNAMIQUE DU DOM  */

const viewBtnList = document.querySelectorAll(".view")
const editBtnList = document.querySelectorAll(".edit")

viewBtnList.forEach((truc, index) => {
	truc.addEventListener("click", () => {
		console.log("tu as clicke mon gars " + listeGens[index].title)
		modalTitle.innerHTML = listeGens[index].title
		modalBody.innerHTML = `<img src="${listeGens[index].imageUrl}" class="img-fluid" alt="${listeGens[index].title}">`
		modalFooter.innerHTML = `
            <button type="button" class="btn btn-secondary"
                data-bs-dismiss="modal"
            >Close
            </button>
        `
	})
})

editBtnList.forEach((btn, index) => {
	btn.addEventListener("click", () => {
		modalTitle.innerHTML = "Edit mode"
		modalBody.innerHTML = `        
            <form>
                <div class="mb-3">
                    <label for="title" class="form-label">Title</label>
                    <input type="text" class="form-control" id="title" aria-describedby="titleHelp" value="${listeGens[index].title}" >
                    
                </div>
                <div class="mb-3">
                    <label for="year" class="form-label">Year</label>
                    <input type="number" class="form-control" id="year" aria-describedby="titleYear" value="${listeGens[index].year}" >
                    
                </div>
                <div class="mb-3">
                    <label for="imageUrl" class="form-label">Image Url</label>
                    <input type="text" class="form-control" id="imageUrl" aria-describedby="titleHelp" value="${listeGens[index].imageUrl}" >
                    <img class="img-thumbnail mt-2" src="${listeGens[index].imageUrl}" >
                </div>
            
        `
		modalFooter.innerHTML = `
		<button type="button"
			class="btn btn-secondary" data-bs-dismiss="modal"
						>
							Close
						</button>
			<button type="submit" class="btn btn-primary submit"
			data-bs-dismiss="modal">Submit</button>
			</form>
		`
		const btnSubmit = document.querySelector(".submit")
		btnSubmit.addEventListener("click", () => {
			// recuperer les donnes du formulaire
			const newTitle = document.querySelector("#title").value
			const newYear = document.querySelector("#year").value
			const newImgUrl = document.querySelector("#imageUrl").value
			/*  empty fields  */
			if (newTitle === "" || newYear === "" || newImgUrl === "") {
				alert("Certaines parties de votre formulaire sont vides")
				return
			}
			console.log(newTitle, newYear, newImgUrl)
			/*  odd characters  */
			const alphanumericRegex = /^[a-zA-Z0-9/.:-_ 'éùçà()&?]+$/
			if (
				!alphanumericRegex.test(newTitle) ||
				!alphanumericRegex.test(newYear)
			) {
				alert("Certaines characters sont pas vailde")
				return
			}
			/*   enregistrer */
			// console.log(newTitle, newImage, newYear, indx)
			listeGens[index].title = newTitle
			listeGens[index].year = newYear
			listeGens[index].imageUrl = newImgUrl

			document.querySelectorAll(".card-title")[index].innerHTML = newTitle
			document.querySelectorAll(".card-text")[index].innerHTML =
				"Year: " + newYear
			document.querySelectorAll(".card-img-top")[index].src = newImgUrl
		})
	})
})
