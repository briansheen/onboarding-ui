function getTL(){
  document.getElementById("TL").innerHTML = "";
  const xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = () => {
    if(xmlHttp.readyState === XMLHttpRequest.DONE){
      if(xmlHttp.status === 200){
        const timelineList = JSON.parse(xmlHttp.responseText);
        for(let i = 0; i < timelineList.length; i++) {

          const user = timelineList[i].twitterUser;

          const div = document.createElement("div");
          div.setAttribute("class", "tweet")

          const userDiv = document.createElement("div");
          userDiv.setAttribute("class", "userInfo");

          const nameDiv = document.createElement("div");
          nameDiv.setAttribute("class", "name");

          const handleDiv = document.createElement("div");
          handleDiv.setAttribute("class", "handle");

          const imgDiv = document.createElement("div");
          imgDiv.setAttribute("class", "img");

          const msgDiv = document.createElement("div");
          msgDiv.setAttribute("class", "msg");

          const dateDiv = document.createElement("div");
          dateDiv.setAttribute("class", "date");

          const contentDiv = document.createElement("div");
          contentDiv.setAttribute("class", "content");

          const link = document.createElement("a");
          link.setAttribute("class", "link");
          link.setAttribute("target", "_blank");
          link.setAttribute("href", `https://twitter.com/${user.twitterHandle}/status/${timelineList[i].id}`);

          const img = document.createElement("img");
          img.setAttribute("class", "img-circle");
          img.setAttribute("src", user.profileImageUrl);

          const name = document.createTextNode(user.name);
          const handle = document.createTextNode(`@${user.twitterHandle}`);


          const date = new Date(timelineList[i].createdAt);
          const formattedDate = document.createTextNode(date.toLocaleDateString("en-US", {month:"short", day:"2-digit"}));

          const message = document.createTextNode(timelineList[i].message);

          imgDiv.appendChild(img);
          nameDiv.appendChild(name);
          handleDiv.appendChild(handle);

          userDiv.appendChild(imgDiv);
          userDiv.appendChild(nameDiv);
          userDiv.appendChild(handleDiv);

          link.appendChild(message);

          dateDiv.appendChild(formattedDate);

          msgDiv.appendChild(link);

          contentDiv.appendChild(dateDiv);
          contentDiv.appendChild(msgDiv);

          div.appendChild(userDiv);
          div.appendChild(contentDiv);

          document.getElementById("TL").appendChild(div);
        }
      } else {
        document.getElementById("TL").innerHTML = "Error Communicating with localhost:8080";
      }
    }
  }
  xmlHttp.open("GET", "http://localhost:8080/api/1.0/twitter/timeline", true);
  xmlHttp.send();
}

document.addEventListener("DOMContentLoaded", () => {
  getTL();
  document.getElementById("refreshTL").addEventListener("click", () => {
    getTL();
  });
});
