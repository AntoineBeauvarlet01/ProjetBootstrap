// initialize variable
let carsList

fetch("http://localhost:3000/api/cars", {
	method: "GET",
	headers: {
		"x-api-key": "azerty",
		"Content-Type": "application/json",
		Accept: "application/json",
	},
})
	.then((res) => {
		if (!res.ok) {
			console.log("your API isn't working !!!")
		}
		res.json().then((data) => {
			console.log(data)
			carsList = data // Mise à jour de la liste des voitures avec les données récupérées
			writeDom()  // APRÈS que les données aient été récupérées 
		})
	})
	.catch((error) =>
		console.error("Erreur lors de la récupération des voitures :", error)
	)

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
function writeDom() {
    carsList.forEach((car) => {
        const articleContainer = document.querySelector(".row")
        articleContainer.innerHTML += `
        <article class="col">
        <div class="card shadow-sm">
            <img src="${car.carImage}" alt="${car.carName}" class="card-img-top" />
            <div class="card-body">
            <h3 class="card-title">${car.carName}</h3>
                <p class="card-text">${car.carYear}</p>
                <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                        <button 
                            type="button" 
                            class="btn btn-sm btn-outline-secondary view" 
                            data-bs-toggle="modal" 
                            data-bs-target="#exampleModal"
                            data-view-id="${car.id}"
                            >
                                View
                        </button>
                        <button 
                            type="button" 
                            class="btn btn-sm btn-outline-secondary edit" 
                            data-bs-toggle="modal" 
                            data-bs-target="#exampleModal"
                            data-edit-id="${car.id}"
                            >
                                Edit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </article>
    `
    })
}