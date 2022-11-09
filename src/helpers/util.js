import { useSelector } from "react-redux";

export const isModulePermisssion = (slug) => {
    const { permissions } = useSelector(state => state.Login);
    return permissions && permissions[slug]
}
