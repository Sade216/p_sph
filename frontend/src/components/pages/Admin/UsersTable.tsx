import { NavLink } from "react-router";
import { Ellipsis, Trash } from "lucide-react";
import { useEffect, useState } from "react";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { TUserArray } from "@_types/types";
import { timestampToData } from "@/lib/utils";
import { deleteUserById, getAllUsers } from "@/lib/api/usersApi";
import EditProfile from "./components/EditProfile";
import { Button } from "@/components/ui/button";

function UsersTable() {
    const [users, setUsers] = useState<TUserArray>([]);

    useEffect(() => {
        getAllUsers().then(({ data }) => {
            setUsers(data);
        });
    }, []);

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>_id</TableHead>
                    <TableHead>Никнейм</TableHead>
                    <TableHead>Почта</TableHead>
                    <TableHead>Музыка</TableHead>
                    <TableHead>Альбомы</TableHead>
                    <TableHead>Создан</TableHead>
                    <TableHead>Обновлен</TableHead>
                    <TableHead className="text-right ">Действия</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users &&
                    users.map((data, key) => (
                        <TableRow key={key}>
                            <TableCell className="">{data._id}</TableCell>
                            <TableCell>{data.username}</TableCell>
                            <TableCell>{data.email}</TableCell>
                            <TableCell className="text-purple-400 hover:text-purple-200">
                                {" "}
                                <NavLink to="/">#All music</NavLink>{" "}
                            </TableCell>
                            <TableCell className="text-purple-400 hover:text-purple-200">
                                {" "}
                                <NavLink to="/">#All albums</NavLink>{" "}
                            </TableCell>

                            <TableCell>
                                {timestampToData(data.createdAt)}
                            </TableCell>
                            <TableCell>
                                {timestampToData(data.updatedAt)}
                            </TableCell>
                            <TableCell className="justify-items-end">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Ellipsis />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem asChild>
                                            <EditProfile user={data} />
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Button
                                                className="w-full"
                                                onClick={() =>
                                                    deleteUserById(data._id)
                                                }
                                                variant="destructive">
                                                <Trash />
                                                <span className="cursor-default">
                                                    Удалить
                                                </span>
                                            </Button>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
            </TableBody>
        </Table>
    );
}

export default UsersTable;
