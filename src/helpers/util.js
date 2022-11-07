

/* Check if user has permission or not */
export const isModulePermisssion = (permissions, slug) => {
    return permissions && permissions[slug]
}