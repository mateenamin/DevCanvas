import User from "../models/User.model";
import bcrypt from 'bcryptjs'; // 1. Bcrypt import kiya

export const signUser = async (req , res) => {

    try {

        const { name , email , password } = req.body  // 1. Data pakra

     //   Matlab: Isay JavaScript me Destructuring kehte hain. User ne Postman ya Frontend se jo data bheja, woh req.body me aaya. Humne usme se teen cheezein (name, email, password) nikaal kar alag variables me rakh leen.


        // 2. Check kiya ke email pehle se hai ya nahi
        const userEmail = await User.findOne({email});
        if(userExists) {
         return res.status(400).json({
           message: "Your email is already registered!"
         });
        }


  //  Matlab:

        //  User.findOne({ email }): Hum apne Model ko keh rahe hain: "Database me jaao aur dhoondo ke kya pehle se is email ka koi user maujood hai?"

        //    await: Kyunki database me dhoondne me waqt lagega, await line ko tab tak rok kar rakhega jab tak MongoDB se jawab nahi aa jata.    


    //    Matlab: Agar database me woh email pehle se mil gayi (userExists true ho gaya), tu hum yahin se return (wapas) ho jayenge. Agay ka code nahi chalega. Hum user ko status 400 (Bad Request) aur error message bhej denge.
      
    
    // 5. Password ko hash kiya (10 salt rounds ke sath)

       // 1. Aik khufia random string (Salt) generate ki takay password mazeed secure ho
const salt = await bcrypt.genSalt(10);
            // 10 = Salt Rounds (Processing speed aur security ka balance)
// 2. Asli password aur salt ko mix kar ke unique encrypted password (Hash) banaya
const hashedPassword = await bcrypt.hash(password, salt);  
    
    // 3. Naya user create kiya
        const newUser = await User.create({
             name ,email , password
        });

         res.status(201).json({
            message : "User successfully registered",
            user: {
                id : newUser_id,
                name: newUser.name,
                email: newUser.email
            }
         });

       //  Matlab: Hum user ko status 201 (Created) bhej rahe hain, jiska matlab hai data kamyabi se save ho gaya. Jawab me hum message bhej rahe hain aur suraksha (security) ke liye sirf user ki id, name, aur email wapas bhej rahe hain (password wapas nahi bhejte)
    }

   catch (err) {
  res.status(500).json({
    message: "Server Error",
    error: err.message
  });
}
   
          //   Matlab: Agar try ke andar koi bhi galti hui (jaise database down ho gaya ya internet chala gaya), tu code seedha yahan aayega. Hum status 500 (Internal Server Error) bhejenge aur error ka message dikha denge taake hamein pata chal sakay ke code me kya masla hua.


        
}