import { Navigate, Route, Routes } from "react-router-dom"
import PageOne from "../pages/PageOne"
import PageTwo from "../pages/PageTwo"
import Auth from "@src/pages/Auth"


export const useRoutes = (isAuthorized: boolean) => {
    if(!isAuthorized){
        return (
            <Routes>
                <Route path="*" element={<Navigate to="/auth" replace />} />
                <Route path="/auth" element={<Auth />} />
            </Routes>
        )
    }
    return (
        <Routes>
            <Route path="*" element={<Navigate to="/page1" replace />}/>
            <Route path="/auth" element={<Navigate to="/news" replace />} />
            <Route path="/page1" element={<PageOne/>}/>
            <Route path="/page2" element={<PageTwo/>}/>
        </Routes>
    )
}