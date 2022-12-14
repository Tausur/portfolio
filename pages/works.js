import React, { useState } from 'react'
import Head from 'next/head';
import mongoose from 'mongoose';
import Work from '../model/Work'
import Link from 'next/link'
import { BiSearch } from 'react-icons/bi'


const Works = (props) => {

  let styles = {
    dark: { background: 'rgb(32 32 35)', color: 'white' },
    white: { background: '#f0e7db' },
  };

  const [search, setSearch] = useState('')

  return (
    <main>

      <Head>
        <title>Tausur Rahaman - Works</title>
        <meta name="description" content="Tausur Rahaman - Works page" />
      </Head>

      <div
        className="pt-20 pb-5"
        style={props.theme == 'dark' ? styles.dark : styles.white}>
        <div className="flex justify-center px-5">
          <div className="md:w-2/3">
            <h1 className="text-3xl font-mono font-bold  border-b-4 border-gray-500 inline-flex justify-center">
              Works
            </h1>

            {/* Search bar */}
            <div className='my-8 py-1 flex items-center justify-center '>
              <div className='px-2 inline-flex items-center rounded-full border-2 border-gray-500'>
                <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" className='bg-transparent focus:outline-none px-4 py-2 md:w-96 border-r-2 border-gray-500' placeholder="Search blogs by it's title or any hotword" />
                <button>
                  <BiSearch className='text-xl mx-2' />
                </button>
              </div>
            </div>

            <div className=" md:flex justify-center md:flex-wrap">
              {/* Works thumnail and Detail */}
              {search == '' && props.works.map((data) => {
                return (
                  <div className="py-6 md:w-1/3 md:mx-2 mx-5" key={data._id}>
                    <Link href={`/Works/${data.productName}`}>
                      <img src={data.image} className="md:w-72 w-full rounded-xl object-cover object-center shadow-xl cursor-pointer" />
                    </Link>
                    <p className="text-2xl font-bold flex justify-center">{data.title}</p>
                    <p className="px-5 py-5">
                      {data.shortDesc}
                    </p>
                  </div>
                )
              })}

              {search !== '' && props.works.map((data) => {
                if (data.title.toLowerCase().slice(0,search.length) == search.toLowerCase().slice(0,search.length)) {
                  return (
                    <div className="py-6 md:w-1/3 md:mx-2 mx-5" key={data._id}>
                      <Link href={`/Works/${data.productName}`}>
                        <img src={data.image} className="md:w-72 w-full rounded-xl object-cover object-center shadow-xl cursor-pointer" />
                      </Link>
                      <p className="text-2xl font-bold flex justify-center">{data.title}</p>
                      <p className="px-5 py-5">
                        {data.shortDesc}
                      </p>
                    </div>
                  )
                }
              })}


            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export async function getServerSideProps({ context }) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URL)
  }
  let works = await Work.find()
  works = works.reverse()
  return { props: { works: JSON.parse(JSON.stringify(works)) } }
}

export default Works