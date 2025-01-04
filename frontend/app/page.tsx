import Calendar from "@/components/Calendar";
import Form from "@/components/Form";
import TimeComponent from "@/components/TimeComponent";

export default function Home() {
  return (
    <div className="bg-[#c3bfbf2f] flex items-center min-h-screen py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4 w-[80%] mx-auto">
        <div>
          <Form />
        </div>
        <div className="space-y-4">
          <div className="py-8 border rounded-md px-8 bg-white ">
            <Calendar />
          </div>
          <div>
            <TimeComponent />
          </div>
        </div>
      </div>
    </div>
  );
}
