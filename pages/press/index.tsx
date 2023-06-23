import Link from 'next/link';
import graphRequest from '@/utils/graphql';
import React, { useState, useEffect, useRef} from 'react';
import { urlForImage } from '@/utils/image';
import Image from 'next/image';
import PageHeader, { Header } from '@/components/PageHeader';

export type News = {
  title: string,
  slug: string,
  link: string,
  bodyRaw: any
}

 type IframesSources = {
  title: string,
  url: string,
  width?: string,
  height?: string
}

type Press = {
  news: News[],
  videos: IframesSources[],
  posts: IframesSources[]
  header: Header
}

const Press = ({news, videos, posts, header} : Press) => {
  return (
    <>
      <PageHeader data={header}/>
      <div className="press page">
        { posts?.length > 0 && <Posts data={posts}/>}
        { news?.length > 0 && <Articles data={news}/>}
        { videos?.length > 0 && <Videos data={videos}/> }
      </div>
    </>
  )
}

const Posts = ({data} : {data: IframesSources[]}) => {
  // type Dimensions = {
  //   width: number | null,
  //   height: number | null,
  // }
  // const [dimensions, setDimensions] = useState<Dimensions>({width: null, height: null});
  // const iframeRef = useRef<HTMLIFrameElement>(null);
  // useEffect(() => {
  //   const iframeElement = iframeRef.current;
  //   const onLoad = () => {
  //     const contentWindow = iframeElement?.contentWindow;
  //     const contentWidth = contentWindow?.document.documentElement.clientWidth;
  //     const contentHeight = contentWindow?.document.documentElement.clientHeight;
  //     setDimensions({width: contentWidth ?? null, height: contentHeight ?? null});
  //   };
  //   iframeElement?.addEventListener('load', onLoad);
  //   return () => {
  //     iframeElement?.removeEventListener('load', onLoad);
  //   };
  // }, []);

  return(
    <>
      <h2>Posts</h2>
      <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-5'>
        {
          data?.map(({title, url, width, height}) => {
            return(
              <div key={title} className='relative w-full min-h-[600px]'>
                <iframe
                  // ref={iframeRef}
                  src={url}
                  className='object-contain w-full h-full'
                  // sandbox='allow-same-origin allow-scripts allow-popups allow-forms'
                  // width={width}
                  // height={height}
                />
              </div>
            )
          })
        }
      </div>
    </>
  )
}

const Articles = ({data} : {data: News[]}) => {
  return(
    <>
      <h2>Articles</h2>
      <div className="press__thumbnail--container ">
        {data?.map(({ title, slug, link, bodyRaw }, idx) => {
          const srcUrl = urlForImage(bodyRaw[0])?.url();
          return (
            <Link
              key={idx}
              className="press__thumbnail group "
              href={slug ? `/press/${slug}` : link}
              target={slug ? '' : "_blank"}
            >
              <div className='press__thumbnail--image'>
                <Image
                  src={srcUrl ?? "/gridbox-logo.png"}
                  alt={srcUrl ?? "gridbox logo"}
                  className={`${
                    srcUrl ? 'object-cover' : 'object-contain px-5'
                  } opacity-90 hover:opacity-100`}
                  fill
                />
              </div>
              <div className='flex'>
                <h4 className="press__thumbnail--title">{title}</h4>
              </div>
            </Link>
          )
        })}
      </div>
    </>
  )
}

const Videos = ({data} : {data: IframesSources[]}) => {
  return(
    <>
    <h2>Videos</h2>
    <div className='grid grid-rows-1 xl:grid-cols-3 sm:grid-cols-2 gap-4 pb-5'>
      {
        data?.map(({title, url}) => {
          return(
            <div key={title} className="h-48 flex justify-center items-center bg-secondary">
              <iframe
                src={url}
                title={title}
                allowFullScreen
                // width="560"
                // height="315"
                className='flex-1 w-full h-full'
              />
            </div>
          )
        })
      }
    </div>
    </>
  )
}

export const getStaticProps = async () => {
  const newsQuery = `{
    allPress (where: {published :{eq: true}}) {
      title,
      slug,
      link,
      bodyRaw
    }
  }`
  const videosQuery = `{
    allVideos{
      title,
      url
    }
  }`

  const headerQuery = `{
    allPageHeaders (where: {title: {eq: "press"}}) {
      title,
      description,
      image{
        asset{
          url
        }
      }
    }
  }`
  
  const linkedInPostsQuery = `{
    allLinkedInPosts (sort: {orderRank: ASC}) {
      title,
      url,
      width,
      height
    }
  }`

  const {data:{ allPress}} = await graphRequest(newsQuery);
  const {data:{ allVideos}} = await graphRequest(videosQuery);
  const {data:{ allLinkedInPosts}} = await graphRequest(linkedInPostsQuery);
  const {data:{allPageHeaders}} = await graphRequest(headerQuery);

  const filteredForImageBlocks = allPress.map((press: any) => {
    const newObj = {...press}
    const imageBlock = press?.bodyRaw?.filter((block: any) => block?._type === "image");
    newObj.bodyRaw = imageBlock;
    return newObj
  })
  return {
    props: {
      news: filteredForImageBlocks,
      videos: allVideos,
      header: allPageHeaders[0],
      posts: allLinkedInPosts
    }
  }
} 

export default Press
