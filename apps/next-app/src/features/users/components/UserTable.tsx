import { useFormContext } from "react-hook-form"
import { AuthenticatedUser, UserAssignmentModel } from "@/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { FormField, FormItem } from "@/components/ui/form"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface UserTableProps {
  fieldName: keyof UserAssignmentModel
  users?: AuthenticatedUser[]
  title: string
  selected: Set<number>
  onSelect: (ids: Set<number>) => void
  onAddAll?: () => void
  onRemoveAll?: () => void
}

const UserTable = (props: UserTableProps) => {
  const form = useFormContext<UserAssignmentModel>()
  const { fieldName, users, selected, onSelect, title, onAddAll, onRemoveAll } =
    props
  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>{title}</CardTitle>
              {onAddAll && (
                <Button
                  size="sm"
                  onClick={() => {
                    field.onChange([])
                    onAddAll()
                  }}
                >
                  Add All
                </Button>
              )}
              {onRemoveAll && (
                <Button
                  size="sm"
                  onClick={() => {
                    field.onChange([])
                    onRemoveAll()
                  }}
                >
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
                            const newSelected = new Set(
                              users.map((user) => user.id)
                            )
                            onSelect(newSelected)
                            field.onChange(Array.from(newSelected))
                          } else {
                            onSelect(new Set())
                            field.onChange([])
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
                            field.onChange(Array.from(newSelected))
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
        </FormItem>
      )}
    />
  )
}

export default UserTable
