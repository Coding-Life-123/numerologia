import 'dotenv/config';
import { GoogleGenerativeAI } from '@google/generative-ai';


const APIS = [process.env.API_KEY1, process.env.API_KEY2, process.env.API_KEY3, process.env.API_KEY4];

let currentKeyIndex = 0;
let GEMINI_API_KEY = APIS[currentKeyIndex];


function rotateApiKey() {
currentKeyIndex = (currentKeyIndex + 1) % apis.length;
GEMINI_API_KEY = APIS[currentKeyIndex];
console.log(`🔁 API key cambiada a: ${GEMINI_API_KEY}`);
}

async function pedirLectura(nombre, fecha){
    const contexto = `quiero que hagas una lectura numerológica basado en los datos que te voy a enviar de cumpleaños y nombre, esta será una lectura diaria, recuerda que debes basarte en los números, por ejemplo si alguien se llama luis sería 12 22 9 20, y debes reducir todo a un número para ponerlo del 0 al 9, entonces 12 22 9 20 pasaría a ser 3 4 9 2, luego 7 11, 7 2, 9 como separando los números y sumando uno a uno hasta quedar con una sola cifra, pero no hace falta que muestres este proceso de suma, debes ser compacto con el mensaje, de aproximadamente 30 palabras, pero con permiso de alargarte a 45 máximo`

    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    console.log(currentKeyIndex);
    
    try{
        const result = await model.generateContent({
            contents: [
            {
                role: "user",
                parts: [{ text: `contexto: ${contexto} \nnombre: ${nombre} \nfecha de nacimiento: ${fecha}` }]
            }
            ],
        })
        console.log(result.response.candidates[0].content.parts[0].text);
        return {"lecture": result.response.candidates[0].content.parts[0].text};
    }catch(error){
        if(error.res && [401, 403, 429].includes(error.res.status)){
            console.warn(`error con la key actual (${error.res.status}). Cambiando a nueva key...`);
            rotateApiKey();
            return pedirLectura(nombre, fecha);
        }else{
            throw error;
        }
    }
}

export default pedirLectura

