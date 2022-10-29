import { Time } from './../../interfaces/time.interface';
import { Stadium, StadiumImage, StadiumOption } from './../../interfaces/stadium.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { BattlePopupComponent } from '../../components/battle-popup/battle-popup.component';
import { ActivatedRoute } from '@angular/router';
import { StadiumService } from 'src/app/module/my-stadium/services/stadium.service';
import { takeUntil, Subject, Observable } from 'rxjs';
import { StadiumImageService } from 'src/app/module/my-stadium/services/stadium-image.service';
import { StadiumOptionService } from 'src/app/module/my-stadium/services/stadium-option.service';
import { DataService } from 'src/app/core/services/data.service';
import { UserResponse } from 'src/app/core/interfaces/user.interface';

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
		private dataService: DataService
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

	public openBattle(): void {
		const modalRef = this.modalService.open(BattlePopupComponent, {
			size: 'lg',
			scrollable: true,
			centered: true
		});
	}

	public ngOnDestroy(): void {
		this.unsubscribe$.next();
		this.unsubscribe$.complete();
	}
}
