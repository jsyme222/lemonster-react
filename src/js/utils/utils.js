import slugify from "slugify"

export const slugTitle = (title) => {
    return slugify(title, "-").toLowerCase()
}