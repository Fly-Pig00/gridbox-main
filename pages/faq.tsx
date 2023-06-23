import React, {useState, useEffect} from 'react';
import { PortableText } from '@portabletext/react';
import { PortableTextBlock } from 'sanity';
import SearchFaq from '@/components/SearchFaq';
import graphRequest from '@/utils/graphql';
import PageHeader, {Header} from '@/components/PageHeader';

export type FaqDataType = {
  question: string,
  section: string,
  answerRaw: PortableTextBlock
};

type Sections = {
  [key: string]: FaqDataType[];
}

const FAQ = ({FAQs, header} : {FAQs: FaqDataType[], header: Header}) => {
  const [filteredFAQs, setFilteredFAQs] = useState([...FAQs]);
  const [sections, setSections] = useState<Sections>({})
  
  useEffect(() => {
    let sorted : any = {}
    filteredFAQs.forEach((faq: FaqDataType) => {
      if(!sorted[faq.section]) {
        sorted[faq.section] = [faq]
        return
      } 
      sorted[faq.section].push(faq);
    });
    setSections(sorted)
  },[filteredFAQs])

  return (
    <>
      {/* <PageHeader data={header}/> */}
      <div className="faq page">
        <h1 className='text-center'>FAQs</h1>
        <SearchFaq original={FAQs} setFiltered={setFilteredFAQs}/>
        {
          Object.keys(sections).map( section => {
            // console.log(sections[section])
            return (
            <div key={section}>
              <h2 className='py-5'>{section}</h2>
              <Accordion data={sections[section]}/>
            </div>
          )
        })
        }
      </div>
    </>
  )
};

const Accordion = ({data} : {data:FaqDataType[]}) => {
  return (
    <div>
      {
        data?.map(({question,answerRaw}) => {
          return(
            <div tabIndex={0} className='collapse collapse-arrow border-b border-neutral-400' key={question}>
              <h4 className='collapse-title'>{question}</h4>
              <div className='collapse-content'>
                <PortableText
                  value={answerRaw} 
                  components={{
                    list: {
                      bullet: ({ children }) => <ul className="list-disc">{children}</ul>,
                    },
                  }}
                />
              </div>
            </div>
          )
        })
      }
      </div>
  )
};

export const getStaticProps= async () => {
  const faqQuery =  `{
    allFaq( sort:{ orderRank: ASC} ){
      question,
      section,
      answerRaw,
    }
  }`;
  const headerQuery = `{
    allPageHeaders (where: {title: {eq: "FAQ"}}) {
      title,
      description,
      image{
        asset{
          url
        }
      }
    }
  }`

  const getFAQs = await graphRequest(faqQuery);
  const getHeader = await graphRequest(headerQuery);

  const {data:{allPageHeaders}} = await getHeader;
  const {data:{allFaq}} = await getFAQs;
  return {
    props:{
      FAQs: allFaq,
      header: allPageHeaders[0]
    }
  };
};

export default FAQ;