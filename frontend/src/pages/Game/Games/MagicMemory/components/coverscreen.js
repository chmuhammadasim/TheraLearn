import Button from "./button.js";

const CoverScreen = ({ score, onStartGame, duration }) => (
  <div className="intro text-center text-2xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-lightpink text-white p-6 rounded-lg shadow-lg">
    <h1 className="title text-3xl mb-4">
      {score > -1 ? "Game over!" : "Magic Memory! 🧠"}
    </h1>
    {score > -1 ? (
      <p className="description text-white">
        {`You scored ${
          score === 0 ? "nothing" : `${score} ${score > 1 ? "hits" : "hit"}`
        }`}
      </p>
    ) : (
      <p className="description text-white">
        A small &amp; simple {duration}-second Magic Memory game built for downsyndrome children.
        Find the source here.
      </p>
    )}
    <div className="action mt-4">
      <Button onClick={onStartGame} width={"wide"}>
        {score > -1 ? "Play again" : "Start Game"}
      </Button>
    </div>
  </div>
);

export default CoverScreen;