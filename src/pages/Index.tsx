import { FileUpload } from "@/components/FileUpload";

const Index = () => {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-semibold mb-6">Timesheets</h1>
        <FileUpload />
        {/* Table will be added in next iteration */}
      </div>
    </div>
  );
};

export default Index;