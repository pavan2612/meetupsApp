import MeetupDetails from '../../components/meetups/MeetupDetails'
import { MongoClient, ObjectId } from 'mongodb';
import { Fragment } from 'react';
import Head from 'next/head';



function MeetupId(props){
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name='description' content={props.meetupData.description} />
      </Head>
      <MeetupDetails
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    'mongodb+srv://meetup:meetups@cluster0.5bqm1.mongodb.net/meetup?retryWrites=true&w=majority'
  );
  const db = client.db();

  const meetupsCollection = db.collection('meetup');

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: 'blocking',
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  // fetch data for a single meetup

  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    'mongodb+srv://meetup:meetups@cluster0.5bqm1.mongodb.net/meetup?retryWrites=true&w=majority'
  );
  const db = client.db();

  const meetupsCollection = db.collection('meetup');

  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
}

export default MeetupId