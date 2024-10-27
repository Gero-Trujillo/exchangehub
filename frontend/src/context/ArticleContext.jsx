import {createContext, useContext, useEffect, useState} from 'react'
import { createArticle, createArticleImage, getArticles, getArticlesByUserId } from '../api/articles.js'

const ArticleContext = createContext()

export const useArticle = () => {
    const context = useContext(ArticleContext)
    if (!context) {
        throw new Error('useArticle must be used within a ArticleProvider')
    }
    return context
}

export const ArticleProvider = ({children}) => {
    const [articles, setArticles] = useState([])

    const getAllArticles = async () => {
        try {
            const res = await getArticles()
            setArticles(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const getArticlesOfUser = async (idUser) => {
        try {
            const res = await getArticlesByUserId(idUser)
            setArticles(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const createArticles = async (data) => {
        try {
            const res = await createArticle(data)
        } catch (error) {
            console.log(error)
        }
    }

    const createArticlesImage = async (data) => {
        try {
            const res = await createArticleImage(data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <ArticleContext.Provider value={{articles, getAllArticles, getArticlesOfUser}}>
            {children}
        </ArticleContext.Provider>
    )
}

export default ArticleContext
