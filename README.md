# React 3D Face Model with Lip Sync (Shape Keys)

This project is a demo application that loads a *3D face model (with shape keys)* created using *KeenTools FaceBuilder* in Blender, and controls lip-sync animation using *Web Speech API (Text-to-Speech)* in Google Chrome.  
It is built using *Vite + React + Three.js + @react-three/fiber + @react-three/drei*.

---

## 🚀 Features
- Load .glb model (exported from Blender)
- Support for *12+ shape keys* (mouth open, smile, phoneme shapes, etc.)
- Real-time *Text-to-Speech* with lip-sync
- Background color and lights adjustable
- Smooth rendering using *react-three-fiber*

---

## 📂 Project Structure

project-root/ │── public/ │   └── model.glb        # Add your exported model here │ │── src/ │   ├── App.jsx          # Main application │   ├── Model.jsx        # Model loader with morph targets │   └── main.jsx         # Entry point │ │── package.json │── vite.config.js │── README.md

---

## 🛠️ Setup Instructions

### 1. Clone the repo
```bash
git clone https://github.com/nitin798563/3D-Lipsing-Human-Model.git

cd 3D-Lipsing-Human-Model

2. Install dependencies

npm install

3. Add your 3D model

Export your Blender face model as .glb

Place it inside the public/ folder
Example:

public/model.glb


4. Run the app

npm run dev

5. Open in browser

Go to:

http://localhost:5173


---



## 🎨 Shape Keys (Lip-Sync)
The following **shape keys** were generated using **KeenTools FaceBuilder + LipSync plugin** in Blender.  
They are mapped to different **visemes (speech sounds)**:

- `sil` → silence / rest  
- `PP` → P, B, M sounds  
- `FF` → F, V sounds  
- `TH` → TH sound  
- `DD` → T, D sounds  
- `kk` → K, G sounds  
- `CH` → CH, J sounds  
- `SS` → S, Z sounds  
- `nn` → N sound  
- `RR` → R sound  
- `aa` → A sound  
- `E` → E sound  
- `ih` → I sound  
- `oh` → O sound  
- `ou` → U sound  
- `UNK` → fallback / unknown sound  

👉 These shape keys allow accurate **phoneme-to-viseme mapping** for lip-sync during Text-to-Speech.

👉 You can add more shape keys as per your Blender model.


---

🖼️ Output / Result

When you type a text and press Speak, the model will:

Speak using Google Chrome Text-to-Speech

Animate lips and face using corresponding shape keys


The 3D model is rendered inside the React app in the browser.



---

🛠️ Technologies Used

React

Vite

Three.js

@react-three/fiber

@react-three/drei

KeenTools FaceBuilder (Blender plugin for realistic head models)



---

📌 Notes

Works best on Google Chrome because it uses the built-in Web Speech API.

If you see white glare on the model, adjust roughness and metalness in Model.jsx.

Background color can be changed inside <Canvas> using:

<color attach="background" args={["#222222"]} />



---

---

📜 License

This project is for educational/demo purposes.
Model and shape keys created with KeenTools FaceBuilder (Blender plugin).
