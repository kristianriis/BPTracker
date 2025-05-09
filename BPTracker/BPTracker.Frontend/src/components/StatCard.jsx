function StatCard({label, value}) {
    return(
        <div className="bg-primary p-4 rounded-lg shadow-md text-center">
            <div className="text-sm text-textMain mb-1">{label}</div>
            <div className="text-2xl font-bold text-textMain">{value} </div>
        </div>
    );
}
export default StatCard;