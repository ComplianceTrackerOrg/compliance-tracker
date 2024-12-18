import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Payment, columns } from "../../components/ui/columns"
import { DataTable } from "../../components/ui/data-table"

async function getData(): Promise<Payment[]> {
    // Fetch data from your API here.
    return [
        {
            employeeId: "E001",
            name: "John Doe",
            department: "Sales",
            training: "Workplace Safety",
            status: "Completed",
            startDate: "2024-01-01",
            completionDate: "2024-01-15",
        },
        {
            employeeId: "E002",
            name: "Jane Smith",
            department: "Marketing",
            training: "Code of Conduct",
            status: "In Progress",
            startDate: "2024-01-10",
            completionDate: null,
        },
        {
            employeeId: "E003",
            name: "Sam Wilson",
            department: "IT",
            training: "Cybersecurity Awareness",
            status: "Not Started",
            startDate: null,
            completionDate: null,
        },
    ]
}

export default async function DemoPage() {
    const data = await getData()

    const stats = [
        {
            title: "Total Employees",
            value: 120,
            description: "The total number of employees being tracked for compliance.",
        },
        {
            title: "Trainings Completed",
            value: 85,
            description: "Employees who have successfully completed all required trainings.",
        },
        {
            title: "Trainings In Progress",
            value: 25,
            description: "Employees actively working on their required trainings.",
        },
        {
            title: "Trainings Not Started",
            value: 10,
            description: "Employees who have not started their required trainings.",
        },
    ];

    return (
        <div className="container mx-auto px-2 py-10 space-y-4">
            <section className="flex flex-col items-start gap-2 border-b border-border/40 py-8 dark:border-border md:py-10 lg:py-12">
                <div className="container">
                    <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]">Compliance Tracker Dashboard</h1>
                    <p className="max-w-2xl text-lg font-light text-foreground">Monitor training progress across your team. Quickly identify employees who are on track, behind, or yet to start their required programs.</p>
                </div>
            </section>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, index) => (
                    <Card key={index}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {stat.title}
                            </CardTitle>
                            {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
            >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg> */}
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <p className="text-xs text-muted-foreground">
                                {stat.description}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <div>
                <DataTable columns={columns} data={data} />
            </div>
        </div>
    )
}
