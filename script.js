const generateForm = document.querySelector(".generate-form");
const imageGallerty = document.querySelector(".image-gallery");

const OPENAI_API_KEY = "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"; 

const generateAiImages= async (userPromt,userImageQuantity) => {
    //we will use OpenAPI to generate images based on the user prompt
    try{
         const response= await fetch("https://api.openai.com/v1/images/generations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                prompt: userPrompt,
                n: userImgQuantity,
                size: "512x512",
                response_format: "b64_json"
              }),
         });
    }catch{
        console.log(error);
    }
}

const handleFormSubmission = (e) => {
    e.preventDefault();  //preventing the submission
    //console.log(e.srcElement);  // srcElement is like whole form

    //get user input and image quantities values
    const userPromt= e.srcElement[0].value;
    const userImageQuantity = e.srcElement[1].value

    //console.log(userPromt, userImageQuantity); //

    //let's create image cards based on selected number

    const imgCardMarkup= Array.from({length: userImageQuantity}, () =>
    `<div class="img-card loading">
     <img src="loader.svg" alt="image">
        <a href="#" class ="download-btn" >
            <img src="download.svg" alt="download.svg" ></img>
        </a>
    </div>`
    ).join("");

    // console.log(imgCardMarkup);

    //let's insert this html markup into image galary

    imageGallerty.innerHTML = imgCardMarkup;

    // let's generate image of the user promt
    generateAiImages(userPromt,userImageQuantity);
}

generateForm.addEventListener("submit", handleFormSubmission);