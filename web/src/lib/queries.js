export const siteSettingsQuery = `*[_type == "siteSettings"][0]{ eventDate, eventLocation, tagline }`

export const categoriesQuery = `*[_type == "category"] | order(order asc){ title, "slug": slug.current, subTypes }`

export const projectsQuery = `*[_type == "project"] | order(title asc){
  title, "slug": slug.current, subType, shortDescription, heroImage,
  "category": category->{ title, "slug": slug.current }
}`

export const projectsByCategoryQuery = `*[_type == "project" && category->slug.current == $slug] | order(title asc){
  title, "slug": slug.current, subType, shortDescription, heroImage
}`

export const categoryBySlugQuery = `*[_type == "category" && slug.current == $slug][0]{ title, subTypes }`

export const projectBySlugQuery = `*[_type == "project" && slug.current == $slug][0]{
  title, subType, overview, heroImage, gallery, projectLink,
  "category": category->{ title, "slug": slug.current },
  "team": team[]->{ name, "slug": slug.current, role, photo, linkedin }
}`

export const peopleQuery = `*[_type == "person"] | order(name asc){ name, "slug": slug.current, role, photo, linkedin }`

export const personBySlugQuery = `*[_type == "person" && slug.current == $slug][0]{
  name, role, bio, photo, linkedin, socials,
  "projects": *[_type == "project" && references(^._id)]{ title, "slug": slug.current, heroImage }
}`
