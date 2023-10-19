import { useEffect, useState } from "react";
import { positionsCollection } from "../../config/firebase-config";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@mui/material";
import { PositionType } from "../../temp/m-city-export";
import { getDocs } from "firebase/firestore";

function Tables() {
  const [positions, setPostions] = useState<PositionType[]>([]);

  console.log(positions);

  async function getPositions() {
    const currentPositions: PositionType[] = [];
    const positionsSnapShot = await getDocs(positionsCollection);
    positionsSnapShot.forEach((position) => {
      currentPositions.push({
        ...position.data(),
        id: position.id
      } as PositionType);
    });
    setPostions(currentPositions);
  }

  function showTeamPositions() {
    return positions
      ? positions.map((pos, i) => {
          return (
            <TableRow key={i}>
              <TableCell>{i + 1}</TableCell>
              <TableCell>{pos.team}</TableCell>
              <TableCell>{pos.w}</TableCell>
              <TableCell>{pos.d}</TableCell>
              <TableCell>{pos.l}</TableCell>
              <TableCell>{pos.pts}</TableCell>
            </TableRow>
          );
        })
      : null;
  }

  useEffect(() => {
    if (positions.length === 0) {
      getPositions();
    }
  }, [positions]);
  return (
    <div className="league_table_wrapper">
      <div className="title">League Table</div>
      <div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Pos</TableCell>
              <TableCell>Team</TableCell>
              <TableCell>W</TableCell>
              <TableCell>L</TableCell>
              <TableCell>D</TableCell>
              <TableCell>Pts</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{showTeamPositions()}</TableBody>
        </Table>
      </div>
    </div>
  );
}

export { Tables };
