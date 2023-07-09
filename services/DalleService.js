import * as dotenv from "dotenv"
import { Configuration, OpenAIApi } from "openai"

dotenv.config()

class DalleService{

    constructor(){

    }

    async getGeneratedImage(req,res){
        try{
            const configuration = new Configuration({
                apiKey : process.env.OPENAI_API_KEY
            })
            
            const openai = new OpenAIApi(configuration)

            const {prompt} = req.body
            const imgResponse = await openai.createImage({
                prompt,
                n: 1,
                size: "1024x1024",
                response_format: "b64_json",
            })
            const image = imgResponse.data.data[0].b64_json;
            console.log(imgResponse)
            res.status(200).json({photo : image});
        }
        catch(e){
            console.log(e.message)
            res.status(500).send("Author runed out of DALL-E credits")
        }
    }
}

const dalleService = new DalleService()

export default dalleService