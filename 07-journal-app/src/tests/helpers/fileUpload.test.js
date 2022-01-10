import cloudinary from 'cloudinary';

import { fileUpload } from "../../helpers/fileUpload";

cloudinary.config({ 
    cloud_name: 'dzasldxdl', 
    api_key: '592666759979488', 
    api_secret: 'mmMtB7ZI8G6H0v8tClPmXMi5Yuo',
    secure: true
  });

describe("Tests inside file 'fileUpload.test.js'", () => {

    test("Must upload a file and return the image url", async() => {
        const resp = await fetch("https://i.picsum.photos/id/1/200/300.jpg?hmac=jH5bDkLr6Tgy3oAg5khKCHeunZMHq0ehBZr6vGifPLY");
        const blob = await resp.blob();

        const file = new File([blob], "file.jpg");
        const url = await fileUpload(file);

        expect(typeof url).toBe("string");

        const segments = url.split("/");
        const imageId = segments[segments.length - 1].replace(".jpg", "");
        await cloudinary.v2.api.delete_resources([imageId]);
    })

    test("Must return an upload error", async() => {
        const file = new File([], "file.png");

        try {
            await fileUpload(file);
        } catch (err) {
            expect(err.error.message).toBe("Empty file");
        }

    })
})