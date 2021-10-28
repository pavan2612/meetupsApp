import NewMeetupForm from '../../components/meetups/NewMeetupForm'

function Newmeetup(){
    const meetUpHandler = (meetupDetails) => {
        console.log('me')
    }
    return(
        <NewMeetupForm onAddMeetUp={meetUpHandler}/>
    )
}
export default Newmeetup