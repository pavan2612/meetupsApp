import MeetupList from '../components/meetups/MeetupList'

function Homepage(props) {
  return(
    <MeetupList meetups={props.meetups}/>
  )

}

export async function getStaticProps(){
  const client = await MongoClient.connect('mongodb+srv://meetups:9951122864@cluster0.p8gnz.mongodb.net/meetups?retryWrites=true&w=majority')
    const db = client.db()

    const collections = db.collection('meetups')
    const MeetupList = collections.find().toArray()

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
