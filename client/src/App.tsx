import ChartBox from "./components/ChartBox";

function App() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen gap-5 bg-blue-900">
      <h1 className="text-6xl text-red-500">Chart App</h1>
      <ChartBox symbol={"AAPL"} />
    </div>
  );
}

export default App;
