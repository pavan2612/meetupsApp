import MeetupList from '../components/meetups/MeetupList'

function Homepage(props) {
  return(
    <MeetupList meetups={}/>
  )

}

export async function getStaticProps(){
  return{
    props:{
      
    }
  }
}

export default Homepage;
