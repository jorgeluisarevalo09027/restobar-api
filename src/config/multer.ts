import multer from "multer";

const storage = multer.memoryStorage(); // Guardamos en memoria antes de procesar con Sharp

const fileFilter = (req: any, file: Express.Multer.File, cb: any) => {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Formato no soportado. Solo JPG, JPEG y PNG."), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // Máximo 5MB
});

export default upload;
