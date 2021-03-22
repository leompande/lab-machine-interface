export interface DashboardSummary {
  totalBoards: number;
  loadTotalDashboards?:boolean;
  plantedSignBoards: number;
  loadPlantedDashboards?:boolean;
  plantedVerifiedBoards: number;
  loadVerifiedDashboards?:boolean;
  notPlantedBoards: number;
  loadNotPlantedDashboards?:boolean;
}


export interface Status{
  agency_name: string;
  number_boards_assigned: number;
  number_of_boards_planted: number;
  percentage_planted: number;
}
