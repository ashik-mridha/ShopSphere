import NotFoundContent from "./NotFoundContent";

const NotFound = () => {
    return (
        <main className="min-h-[calc(100vh-82px)] w-full bg-[#121614] text-gray-100 flex items-center justify-center relative overflow-hidden pb-16 md:pb-0">

            {/* Background Decorative Grid */}
            <div
                className="absolute inset-0 bg-[linear-gradient(to_right,#1f292415_1px,transparent_1px),linear-gradient(to_bottom,#1f292415_1px,transparent_1px)] bg-[size:4rem_4rem]"
            />

            {/* Content Section */}
            <NotFoundContent />
        </main>
    );
};

export default NotFound;