import { Fragment } from "react";
import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import Head from "next/head";

function MeetupDetails(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        // image="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Tokyo_Shibuya_Scramble_Crossing_2018-10-09.jpg/1024px-Tokyo_Shibuya_Scramble_Crossing_2018-10-09.jpg"
        // title="A First Meetup"
        // address="Some Street 5, Some City"
        // description="The meetup description"
        title={props.meetupData.title}
        image={props.meetupData.image}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb://raadhosieni:1234@cluster0-shard-00-00.tue3d.mongodb.net:27017,cluster0-shard-00-01.tue3d.mongodb.net:27017,cluster0-shard-00-02.tue3d.mongodb.net:27017/meetups?ssl=true&replicaSet=atlas-x0ijne-shard-0&authSource=admin&retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb://raadhosieni:1234@cluster0-shard-00-00.tue3d.mongodb.net:27017,cluster0-shard-00-01.tue3d.mongodb.net:27017,cluster0-shard-00-02.tue3d.mongodb.net:27017/meetups?ssl=true&replicaSet=atlas-x0ijne-shard-0&authSource=admin&retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        image: selectedMeetup.image,
        address: selectedMeetup.address,
        description: selectedMeetup.description,
      },
    },
  };
}

export default MeetupDetails;
