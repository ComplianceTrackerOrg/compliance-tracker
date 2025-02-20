import { AuthenticatedUser } from "@/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface UserTableProps {
  users?: AuthenticatedUser[]
  title: string
  selected: Set<number>
  onSelect: (ids: Set<number>) => void
  onAddAll?: () => void
  onRemoveAll?: () => void
}

const UserTable = (props: UserTableProps) => {
  const { users, selected, onSelect, title, onAddAll, onRemoveAll } = props
  return (
    <Card className="flex-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>{title}</CardTitle>
        {onAddAll && (
          <Button size="sm" onClick={onAddAll}>
            Add All
          </Button>
        )}
        {onRemoveAll && (
          <Button size="sm" onClick={onRemoveAll}>
            Remove All
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <Table className="rounded-md border">
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={
                    users &&
                    users.length > 0 &&
                    users.every((user) => selected.has(user.id))
                  }
                  onCheckedChange={(checked) => {
                    if (users && checked) {
                      onSelect(new Set(users.map((user) => user.id)))
                    } else {
                      onSelect(new Set())
                    }
                  }}
                />
              </TableHead>
              <TableHead>Name</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Checkbox
                    checked={selected.has(user.id)}
                    onCheckedChange={(checked) => {
                      const newSelected = new Set(selected)
                      if (checked) {
                        newSelected.add(user.id)
                      } else {
                        newSelected.delete(user.id)
                      }
                      onSelect(newSelected)
                    }}
                  />
                </TableCell>
                {user.firstName && user.lastName && (
                  <TableCell>{`${user.firstName} ${user.lastName}`}</TableCell>
                )}
                {user.firstName && !user.lastName && (
                  <TableCell>{`${user.firstName}`}</TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {users && (
          <p className="text-sm text-muted-foreground">
            {selected.size} of {users.length} selected.
          </p>
        )}
      </CardContent>
    </Card>
  )
}

export default UserTable
