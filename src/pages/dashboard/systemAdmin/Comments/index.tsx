import CommentCard from "./CommentCard";

const Comments = () => {
  const data =
    "That's a fantastic new app feature. You and your team did an excellent job of incorporating user testing feedback.";

  return (
    <div className="">
      <CommentCard
        name={"Maude Hall"}
        image={""}
        content={data}
        time={"14 min"}
        likes={"5"}
      />
    </div>
  );
};

export default Comments;
