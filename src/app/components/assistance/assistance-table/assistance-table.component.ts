import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, combineLatest, map, tap } from 'rxjs';
import { Assistance } from 'src/app/api/assistance.model';
import { AssistanceService } from 'src/app/api/assistance.service';

export interface AssistanceFilters {
  sort: { 
    active: string;
    direction: 'asc' | 'desc' | ''
  };
}

@Component({
  selector: 'app-assistance-table',
  templateUrl: './assistance-table.component.html',
  styleUrls: ['./assistance-table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))]
    )
  ]
})
export class AssistanceTableComponent {

  readonly displayedColumns = ['name', 'amount', 'expand'];
  readonly displayedColumnsWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement!: Assistance | null;
  dataSource!: MatTableDataSource<Assistance>;

  readonly filters$ = new BehaviorSubject<AssistanceFilters>({ sort: { active: 'name', direction: 'asc' } });
  readonly assistances$ = combineLatest({
    filters: this.filters$.asObservable(),
    assistances: this.assistanceService.findAll$()
  }).pipe(
    map(({ filters, assistances }) => {
      let filteredAssistances = [...assistances];
      switch (filters.sort.active) {
        case 'name':
          filteredAssistances.sort(function(a: Assistance, b: Assistance) {
            if (a.organization.name.toLocaleUpperCase() > b.organization.name.toLocaleUpperCase()) {
              return filters.sort.direction !== 'desc' ? 1 : -1;
            } else if (a.organization.name.toLocaleUpperCase() < b.organization.name.toLocaleUpperCase()) {
              return  filters.sort.direction !== 'desc' ? -1 : 1;
            }
             return 0;
          });
      }
      return filteredAssistances;
    }),
    tap(assistances => this.dataSource = new MatTableDataSource(assistances))
  );

  
  constructor(
    private assistanceService: AssistanceService
  ) {}

  assistanceSortChanges(event: any): void {
    this.filters$.next({ ...this.filters$.value, sort: {...event} });
  }

  searchFieldChanges(event: any): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
