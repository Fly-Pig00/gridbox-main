import graphRequest from '@/utils/graphql';
import React from 'react';
import { CustomPortableText } from '@/components/CustomPortableText';

import { News } from '..';


const Articles = ({articles} : {articles: News}) => {
  return (
    <div className='article page'>
      <CustomPortableText value={articles?.bodyRaw}/>
    </div>
  )
}

export const getStaticProps = async ({params}: {params: {articles: string}}) => {
  const newsQuery = `{
    allPress (where: {slug: {eq: "${params?.articles}"}}) {
      title,
      bodyRaw
    }
  }`
  const getNews = await graphRequest(newsQuery);
  const {data:{ allPress}} = await getNews;
  return {
    props:{
      articles: allPress[0]
    }
  }
}

export const getStaticPaths = async () => {
  const articlesQuery = 
  `{
    allPress (where: {published :{eq: true}}) {
      slug,
    }
  }`
  const getArticles = await graphRequest(articlesQuery);
  const {data:{ allPress}} = await getArticles;
  const paths = [] as object[];
  allPress.forEach(({ slug }: News) => {
    if (slug) paths.push({ params: { articles: slug } })
  })
  return {
    paths,
    fallback: false,
  }
}

export default Articles