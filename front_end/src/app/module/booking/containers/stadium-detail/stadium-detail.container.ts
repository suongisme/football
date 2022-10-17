import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Time } from './../../interfaces/time.interface';
import { CurrencyPipe } from '@angular/common';
import { BookingService } from './../../services/booking.service';
import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { BattlePopupComponent } from '../../components/battle-popup/battle-popup.component';

@Component({
	selector: 'app-stadium-detail-container',
	templateUrl: './stadium-detail.container.html',
	styleUrls: ['./stadium-detail.container.scss'],
})
export class StadiumDetailContainer implements OnInit {
	
	public isReadMore: boolean = false;
	public columns: ColDef[];
	public rows: Time[];
	public groupHeader: ColDef = {
		headerName: 'Loại sân',
		minWidth: 100,
		maxWidth: 150,
	}

	constructor(
		private bookingService: BookingService,
		private currencyPipe: CurrencyPipe,
		private modalService: NgbModal
	) { }

	public ngOnInit(): void {
		this.bookingService
			.searchStadium(null)
			.subscribe((result) => this.bookingService.bookingResult$.next(result));
		this.columns = [
			{
				headerName: 'Thời gian',
				field: 'time',
			},
			{
				headerName: 'Giá',
				cellStyle: {
					'font-weight': 'bold',
				},
				valueGetter: (params) => {
					const time = params.data;
					return this.currencyPipe.transform(time?.price, 'VND');
				},
			},
		];

		this.rows = [
			{
				key: 'Sân 4 người',
				children: [
					{
						key: '',
						time: '16h1 - 17h',
						price: 300000,
					},
				],
			},
			{
				key: 'Sân 3 người',
				children: [
					{
						key: '',
						time: '16h2 - 17h',
						price: 300000,
					},
				],
			},
		];
	}

	public openBattle(): void {
		const modalRef = this.modalService.open(BattlePopupComponent, {
			size: 'lg',
			scrollable: true,
			centered: true
		});
	}
}
