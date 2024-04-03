import axios from "axios";
import { refs, value, showLoader, currentPage, pageLimit} from "../main";

const myAxios = axios.create ({
    baseURL: "https://pixabay.com/api/",
})

export async function getImages() {
    const params = {
        key: "3539379-d64fd5a5897018ff1512b690c",
        q: value,
        per_page: pageLimit,
        page: currentPage,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: "true",
    };

    showLoader();

    const response = await myAxios.get("", { params })
    return response.data;
};

