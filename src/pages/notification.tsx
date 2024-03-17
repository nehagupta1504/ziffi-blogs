import NotificationComponent from "@/components/notification/notification";
import { NextApiRequest, NextApiResponse } from "next";

export default function Notification(props: any) {
  return <NotificationComponent {...props} />;
}

const getServerSideProps = async ({ req, res }: { req: NextApiRequest; res: NextApiResponse }) => {
    // add query to db for accessing user's notifications
};
