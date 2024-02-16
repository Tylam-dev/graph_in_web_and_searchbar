const searchInput = document.querySelector('.searchInput')
const mainDiv = document.querySelector('.mainDiv')
const bg = document.querySelector('.bg')
let namesFound
let mainContainerStatus
let childSelected


searchInput.addEventListener('input', (event) => {
    isDivWillDelete()
    const inputWords = event.target.value;
    (inputWords)? mainDiv.appendChild(createDiv(searchNames(inputWords, names))): "";
    childSelected = -1
    namesFound = document.querySelectorAll('.nameFound')
    createSelectNameEvent()
    createClickEvent()
})


const names = [
    {name: "elam"},
    {name: "josue"},
    {name: "daniela"},
    {name: "omar"},
    {name: "jose"}
]

const isDivWillDelete = () => {
    const divWillDelete = document.querySelector('.mainContainer')
    if (divWillDelete){
        divWillDelete.remove()
        mainContainerStatus = false
        showBg()
    }else{
        return
    }
}

const searchNames = (word, data) => {
        return data.filter((element) => (element.name.includes(word)))
}

const createDiv = (arrayNames) => {
    document.addEventListener('keydown', pressKeyEvent)
    mainContainerStatus = true
    showBg()
    const mainContainer = document.createElement('div')
    mainContainer.className = 'mainContainer'
    arrayNames.forEach(element => {
        mainContainer.appendChild(createChildren(element.name))
    });
    return mainContainer
    
}
const createChildren = (nameSearched) => {
    const childDiv = document.createElement('div')
    childDiv.className = 'childDiv'
    const nameItem = document.createElement('p')
    nameItem.textContent = nameSearched
    nameItem.className = "nameFound"
    const divCompleted = childDiv.appendChild(nameItem)
    return divCompleted
}
bg.addEventListener('click', isDivWillDelete)
searchInput.addEventListener('focus', (event) => {
    isDivWillDelete()
    const inputWords = event.target.value;
    childSelected = -1;
    (inputWords)? mainDiv.appendChild(createDiv(searchNames(inputWords, names))): "";
    namesFound = document.querySelectorAll('.nameFound');
    createSelectNameEvent()
    createClickEvent()
})

const showBg = () => {
    (mainContainerStatus)? bg.style.display = 'block':bg.style.display = 'none'
}

const selectChild = (child, arrayNames) => {
    arrayNames[child].classList.add('selected')
}
const unSelectChild = (child, arrayNames) => {
    if( child === 0){
        if(arrayNames[arrayNames.length -1].className.includes('selected')){
            arrayNames[arrayNames.length -1].classList.remove('selected')
        }
    }else{
        arrayNames[child -1].classList.remove('selected')
    }
}

function pressKeyEvent (event){
    if(event.key === "ArrowDown"){
        childSelected+=1
        if(childSelected == namesFound.length){
            console.log("se paso", childSelected)
            childSelected = 0
            unSelectChild(childSelected,namesFound)
            selectChild(childSelected,namesFound)
        }else{
            console.log(childSelected)
            unSelectChild(childSelected,namesFound)
            selectChild(childSelected,namesFound)
        }    
    }else if(event.key == 'Enter'){
        console.log(checkSelected()[0].textContent)
    }
}
function checkSelected (){
    const copyNamesFound = [...namesFound]
    const filteredNames = copyNamesFound.filter(element => element.className.includes("selected"))
    return filteredNames
}
function createSelectNameEvent (){
    namesFound.forEach(element => element.addEventListener('mouseover', selectNameWithMouse))
}
function selectNameWithMouse (target){
    const nameTarget = target.target
    if(checkSelected().length == 0){
        nameTarget.classList.add('selected')
    }else{
        namesFound.forEach(element => element.className = "nameFound")
        nameTarget.classList.add("selected")
    }
}
function createClickEvent(){
    namesFound.forEach(element => element.addEventListener('click', () => {console.log(checkSelected()[0].textContent)}))
}