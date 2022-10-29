import { ConfirmComponent } from './../../../../core/components/_confirm/_confirm.component';
import { Confirm } from './../../../../core/interfaces/confirm.interface';
import { Time } from './../../interfaces/time.interface';
import { Stadium, StadiumImage, StadiumOption } from './../../interfaces/stadium.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { BattlePopupComponent } from '../../components/battle-popup/battle-popup.component';
import { ActivatedRoute, Router } from '@angular/router';
import { StadiumService } from 'src/app/module/my-stadium/services/stadium.service';
import { takeUntil, Subject, Observable, filter, lastValueFrom } from 'rxjs';
import { StadiumImageService } from 'src/app/module/my-stadium/services/stadium-image.service';
import { StadiumOptionService } from 'src/app/module/my-stadium/services/stadium-option.service';
import { DataService } from 'src/app/core/services/data.service';
import { UserResponse } from 'src/app/core/interfaces/user.interface';
import { RequestService } from 'src/app/module/request/services/request.service';

@Component({
	selector: 'app-stadium-detail-container',
	templateUrl: './stadium-detail.container.html',
	styleUrls: ['./stadium-detail.container.scss'],
})
export class StadiumDetailContainer implements OnInit, OnDestroy {

	private unsubscribe$: Subject<void> = new Subject();

	public stadiumByProvince$: Observable<Stadium[]>;
	public stadiumImage$: Observable<StadiumImage[]>
	public stadiumOption$: Observable<StadiumOption[]>;
	public stadiumDetail$: Observable<Time[]>;
	public stadium: Stadium;
	public isReadMore: boolean = false;
	public isOwnerStadium: boolean = false;

	private currentUser: UserResponse;

	constructor(
		private modalService: NgbModal,
		private router: ActivatedRoute,
		private stadiumService: StadiumService,
		private stadiumImageService: StadiumImageService,
		private stadiumOptionService: StadiumOptionService,
		private dataService: DataService,
		private requestService: RequestService,
		private _router: Router
	) { }

	public ngOnInit(): void {
		this.currentUser = this.dataService.currentUser$.getValue();
		this.isOwnerStadium = this.currentUser && this.currentUser.userDto.role == 'OWNER_STADIUM';

		this.router.params.subscribe(res => {
			
			this.stadiumService.getStadiumById(res.id)
				.pipe(takeUntil(this.unsubscribe$))
				.subscribe(res => {
					this.stadium = res;
					this.stadiumByProvince$ = this.stadiumService.getStadiumByProvinceId(this.stadium.provinceId);
					this.stadiumImage$ = this.stadiumImageService.getStadiumImage(this.stadium.id);
					this.stadiumOption$ = this.stadiumOptionService.getStadiumOption(this.stadium.id);
					this.stadiumDetail$ = this.stadiumService.getStadiumDetail(this.stadium.id);
				})
		})
	}

	public async openBattle(): Promise<void> {
		const battle = await lastValueFrom(this.requestService.getCompetitorStadium(this.stadium.id))
		const modalRef = this.modalService.open(BattlePopupComponent, {
			size: 'lg',
			scrollable: true,
			centered: true
		});
		modalRef.componentInstance.rowData = battle;
	}

	public deleteStadium(): void {
        const modalRef = this.modalService.open(ConfirmComponent);
        const content: Confirm = {
            title: 'Xóa sân vận động',
            message: 'Bạn có chắc chắn không!'
        };
        modalRef.componentInstance.content = content;
        modalRef.closed
        .pipe(filter(res => res))
        .subscribe(res => {
            this.stadiumService.deleteStadium(this.stadium.id)
				.pipe(takeUntil(this.unsubscribe$))
				.subscribe(res => {
					this._router.navigate(['my-stadium'])
				})
        })
    }

	public ngOnDestroy(): void {
		this.unsubscribe$.next();
		this.unsubscribe$.complete();
	}
}
