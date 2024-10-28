
import { useState, useEffect } from "react";
import axios, { getAdapter } from "axios";


export default function AllQuestion() {
  const [questions, setQuestions] = useState();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch("/api/question/");
        const data = response.json();
        if (response.ok){
          console.log(data)
        } else {
          console.log("Error fetching data")
        }
      } catch (error) {
        console.error("Error creating question: ", error.response.data)
      }
    }
    getData();
  }, [])

  return (
    <div>

    </div>
  );
}