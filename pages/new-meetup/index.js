import { useRouter } from 'next/router'
import {Fragment} from 'react'
import NewMeetupForm from '../../components/meetups/NewMeetupForm'
import Head from 'next/head';

function Newmeetup(){
    console.log('meetup2')
    const router = useRouter()
    const meetUpHandler = async (meetupDetails) => {
        const response = await fetch('/api/new-meetup',{
            method:'POST',
            body: JSON.stringify(meetupDetails),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json()
        console.log(data)
    
    router.push('/')    
    }
    return(
        <Fragment>
            <Head>
            <title>Add a New Meetup</title>
            <meta
            name='description'
            content='Add your own meetups and create amazing networking opportunities.'
            />
            </Head>
            <NewMeetupForm onAddMeetUp={meetUpHandler}/>
        </Fragment>
    )
}
export default Newmeetup