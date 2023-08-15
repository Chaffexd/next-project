import Head from "next/head";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";

const HomePage = (props) => {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta name="description" content="Meetups" />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
};

export async function getStaticProps() {
  // never ends up or executes on client side
  // fetch data from an API, must return an object
  // this is a standard way
  const client = await MongoClient.connect(
    "mongodb+srv://shane:QqneL3LADLXUOLKD@cluster0.ftntdvj.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1, // number of seconds it will wait before it checks again if there are more requests
  };
}

/* export async function getServerSideProps(context) {
  // do have acess to request and res
  const req = context.req;
  const res = context.res;
  // runs always on the server after deployment
  // can still fetch data, always runs on the server
  return {
    props: {
      meetups: DUMMY_MEETUPS
    }
  }
}; */

export default HomePage;
