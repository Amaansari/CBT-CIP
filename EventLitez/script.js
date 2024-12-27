const createBtn = document.querySelector("#createbtn");

const crossBtn = document.querySelector(".form-cross");
const form = document.querySelector("form");

const eventList = document.querySelector(".event-list");

let editEventComp = null;

const formateTime = (time)=>{
    const timeArr = time.split(":");
    let newTime;
    if(timeArr[0]>=12){
        timeArr[0] = timeArr[0]>12?timeArr[0]-12:timeArr[0]; 
        newTime = timeArr.join(":")+" PM";   
    }
    else{
        newTime = time+" AM";
    }
    
    return newTime;
}

const formatDate = (date)=>{
    return date.split("-").reverse().join("/");
}

const convertTo24Hour = (time)=>{
    const timeArr = time.split(" ");
    const hrMinArr = timeArr[0].split(":");
    if(timeArr[1]=="PM"&&hrMinArr[0]<12){
        hrMinArr[0] = +hrMinArr[0]+12;
    }
    return hrMinArr.join(":");  
}

const editEvent = (e)=>{
    const event = e.target.parentNode;
    editEventComp = event;
    const left = event.children[0];
    const right = event.children[1];
    const h2 = left.children[0];
    const locPara = left.children[1];
    const datePara = right.children[0];
    const timePara = right.children[1];
    
    form[0].value = h2.innerText;
    form[1].value = datePara.innerText.split('/').reverse().join("-");
    form[2].value = convertTo24Hour(timePara.innerText);
    form[3].value = locPara.innerText;

    form.style.right = "0px";
}

const deleteEvent = (e)=>{
    const event = e.target.parentNode;
    const eventList = event.parentNode;
    eventList.removeChild(event);
}


const createComponent = (title,date,time,location)=>{
    const divEvent = document.createElement("div");
    divEvent.setAttribute("class","event");
    const divLeft = document.createElement("div");
    const divRight = document.createElement("div");
    divLeft.setAttribute("class","left");
    divRight.setAttribute("class","right");
    const h2 = document.createElement("h2");
    h2.textContent = title;
    const pLoc = document.createElement("p");
    pLoc.textContent = location;

    divLeft.appendChild(h2);
    divLeft.appendChild(pLoc);

    const pDate = document.createElement("p");
    const pTime = document.createElement("p");
    pDate.textContent = date;
    pTime.textContent = time;

    divRight.appendChild(pDate);
    divRight.appendChild(pTime);

    divEvent.appendChild(divLeft);
    divEvent.appendChild(divRight);


    const editIcon = document.createElement("i");
    editIcon.setAttribute("class","fa-solid fa-pen-to-square");
    editIcon.addEventListener("click",editEvent);

    const deleteIcon = document.createElement("i");
    deleteIcon.setAttribute("class","fa-solid fa-x event-delete-icon");
    deleteIcon.addEventListener("click",deleteEvent);

    divEvent.appendChild(deleteIcon);
    divEvent.appendChild(editIcon);

    return divEvent;
}

createBtn.addEventListener("click",()=>{
    form.style.right="0%";
});

crossBtn.addEventListener("click",()=>{
    form.style.right="-100%"
})

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const title = form[0].value;
    const date = formatDate(form[1].value);
    const time = formateTime(form[2].value);
    const location = form[3].value;
    form.reset();
    if(editEventComp){
        const left = editEventComp.children[0];
        const right = editEventComp.children[1];
        const h2 = left.children[0];
        const locPara = left.children[1];
        const datePara = right.children[0];
        const timePara = right.children[1];
        h2.innerText = title;
        locPara.innerText = location;
        datePara.innerText = date;
        timePara.innerText = time;
        editEventComp = null;
        return;
    }
    const event = createComponent(title,date,time,location);
    if(eventList.innerText=="No Event"){
        eventList.innerHTML="";
        eventList.style.textAlign = "left";
        eventList.style.fontSize = "1rem";
    }
    eventList.appendChild(event);
})

