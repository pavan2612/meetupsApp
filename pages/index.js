import MeetupList from '../components/meetups/MeetupList'
import Head from 'next/head';
import { MongoClient } from 'mongodb';
import {Fragment} from 'react'

function Homepage(props) {
  return(
    <Fragment>
      <Head>
        <title>My Meetups</title>
        <meta
          name='description'
          content='Browse a huge list of highly active React meetups!'
        />
      </Head>
      <MeetupList meetups={props.meetups}/>
    </Fragment>
    
  )

}

export async function getStaticProps(){
  const client = await MongoClient.connect('mongodb+srv://meetup:meetups@cluster0.5bqm1.mongodb.net/meetup?retryWrites=true&w=majority')
    const db = client.db()

    const collections = db.collection('meetup')
    const MeetupList = await collections.find().toArray()

    client.close()
  return{
    props:{
      meetups: MeetupList.map((meetup) => ({
        title:meetup.title,
        image: meetup.image,
        address: meetup.address,
        id:meetup._id.toString()
      }))
    },
    revalidate:1
  }
}

export default Homepage;
