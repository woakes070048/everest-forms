/* global evf_upgrade, evf_data */
jQuery( function( $ ) {

	/**
	 * Upgrade actions.
	 */
	var evf_upgrade_actions = {
		init: function() {
			$( document.body ).on( 'click dragstart', '.evf-registered-item.upgrade-modal', this.field_upgrade );
			$( document.body ).on( 'click dragstart', '.evf-registered-item.evf-upgrade-addon', this.evf_upgrade_addon );
			$( document.body ).on( 'click dragstart', '.evf-registered-item.enable-stripe-model', this.enable_stripe_model );
			$( document.body ).on( 'click dragstart', '.evf-registered-item.enable-authorize-net-model', this.enable_authorize_net_model );
			$( document.body ).on( 'click dragstart', '.evf-registered-item.everest-forms-pro-is_square_install', this.install_square_addon_notice );

			if( 0 === $( document.body ).find('.evf-registered-item.everest-forms-pro-is_square_install').length ){
				$( document.body ).on( 'click dragstart', '.evf-registered-item.enable-square-model', this.enable_square_model );
			}

			$( document.body ).on( 'click dragstart', '.everest-forms-field-option-row.upgrade-modal', this.feature_upgrade );
			$( document.body ).on( 'click dragstart', '.evf-upgradable-feature, .everest-forms-btn-group span.upgrade-modal', this.feature_upgrade );
			$( document.body ).on( 'click dragstart', '.evf-one-time-draggable-field, .evf-registered-item.evf-one-time-draggable-field', this.evf_one_time_draggable_field );
			$( document.body ).on( 'click ', '.everest-forms-integrations[data-action="upgrade"]', this.integration_upgrade );
			$( document.body ).on( 'click dragstart', '.evf-registered-item.recaptcha_empty_key_validate', this.recaptcha_empty_key_validate );
			$( document.body ).on( 'click dragstart', '.evf-registered-item.hcaptcha_empty_key_validate', this.hcaptcha_empty_key_validate );
			$( document.body ).on( 'click dragstart', '.evf-registered-item.turnstile_empty_key_validate', this.turnstile_empty_key_validate );
			$( document.body ).on( 'click ', '.upgrade-addons-settings', this.integration_upgrade );
			$( document.body ).on( 'click ', '.evf-pro-feature', this.customizerupgrade );
			$( document.body ).on( 'click ', '.evf-pro-palette', this.customizerupgrade );
			$( document.body ).on( 'click ', '.everest-forms-pro-template', this.customizerupgrade );


		},
		customizerupgrade: function (e) {
			e.preventDefault();

			var customStyles = `
				.wp-customizer .jconfirm-box {
					padding: 40px 30px !important;
				}

				.wp-customizer .jconfirm-box .jconfirm-title-c {
					margin-bottom: 24px !important;
					padding: 0 !important;
				}

				.wp-customizer .jconfirm-box .jconfirm-title-c .jconfirm-title {
					text-align: center !important;
					border-bottom: 0px;
				}

				.wp-customizer .jconfirm-box .jconfirm-content-pane {
					margin-bottom: 0 !important;
				}

				.wp-customizer .jconfirm-box .jconfirm-content-pane .jcontent-content > div {
					text-align: center !important;
					color: #646464 !important;
					font-size: 16px !important;
					line-height: 26px !important;
					font-weight: 400 !important;
				}

				.wp-customizer .jconfirm-box .jconfirm-content-pane .jconfirm-content > div h2 {
					margin-top: 0 !important;
					margin-bottom: 12px !important;
					font-size: 26px !important;
					line-height: 34px !important;
					text-align: center !important;
					font-weight: 600 !important;
					color: #222222 !important;
					border-bottom: 0 !important;
					padding-bottom: 0 !important;
				}

				.wp-customizer .jconfirm-box .jconfirm-content-pane .jconfirm-content > div p {
					color: #646464 !important;
					text-align: center !important;
					font-size: 15px !important;
					font-weight: 400 !important;
					line-height: 25px !important;
					margin: 0 !important;
				}

				.wp-customizer .jconfirm-box .jconfirm-buttons {
					margin-top: 20px !important;
					padding: 0 !important;
					background: none !important;
					float: unset !important;
				}

				.wp-customizer .jconfirm-box .jconfirm-buttons .btn-confirm {
					width: 100% !important;
					border-radius: 4px !important;
					background: #2563EB !important;
					color: #ffffff !important;
					font-size: 16px !important;
					font-weight: 500 !important;
					line-height: 24px !important;
					padding: 10px !important;
				}

				.wp-customizer .jconfirm-box .jconfirm-buttons .btn-confirm:hover {
					background: #2f49bc !important;
				}

				.jconfirm-title .dashicons {
					margin-right: 8px;
					vertical-align: middle;
					font-size: 28px;
					color: #2563EB;
				}
			`;

			$('head').append('<style>' + customStyles + '</style>');

			$.alert({
				title: `
				<svg width="150" height="131" viewBox="0 0 150 131" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M115.352 14.9928L74.6528 0L34.3428 14.7953C29.1956 17.2851 24.6828 18.7814 24.6828 23.6952V48.1984C24.5988 65.3473 29.1904 82.1947 37.9638 96.9296C45.4812 109.445 57.1163 122.331 75.0718 130.524C91.5489 125.036 103.848 110.402 111.366 97.8812C120.14 83.1488 124.731 66.3031 124.647 49.1561V27.1187C124.617 20.1041 120.996 16.6806 115.352 14.9928Z" fill="#4A7EEE"/>
					<g opacity="0.8">
					<path d="M115.352 14.9928L74.6528 0L34.3428 14.7953C29.1956 17.2851 24.6828 18.7814 24.6828 23.6952V48.1984C24.5988 65.3473 29.1904 82.1947 37.9638 96.9296C45.4812 109.445 57.1163 122.331 75.0718 130.524C91.5489 125.036 103.848 110.402 111.366 97.8812C120.14 83.1488 124.731 66.3031 124.647 49.1561V27.1187C124.617 20.1041 120.996 16.6806 115.352 14.9928Z" fill="white"/>
					</g>
					<path d="M99.5029 76.9754H92.0215V36.2764C92.0215 31.6675 90.1906 27.2473 86.9316 23.9884C83.6726 20.7294 79.2525 18.8985 74.6436 18.8985C70.0347 18.8985 65.6145 20.7294 62.3556 23.9884C59.0966 27.2473 57.2657 31.6675 57.2657 36.2764V76.9754H49.7842V36.2764C49.7331 32.9794 50.3383 29.7051 51.5646 26.6442C52.791 23.5833 54.6139 20.7969 56.9274 18.4472C59.2409 16.0976 61.9986 14.2316 65.0402 12.9579C68.0817 11.6843 71.3462 11.0283 74.6436 11.0283C77.941 11.0283 81.2055 11.6843 84.247 12.9579C87.2885 14.2316 90.0463 16.0976 92.3597 18.4472C94.6732 20.7969 96.4962 23.5833 97.7225 26.6442C98.9489 29.7051 99.5541 32.9794 99.5029 36.2764V76.9754Z" fill="#4A7EEE"/>
					<g opacity="0.4">
					<path d="M99.5029 76.9754H92.0215V36.2764C92.0215 31.6675 90.1906 27.2473 86.9316 23.9884C83.6726 20.7294 79.2525 18.8985 74.6436 18.8985C70.0347 18.8985 65.6145 20.7294 62.3556 23.9884C59.0966 27.2473 57.2657 31.6675 57.2657 36.2764V76.9754H49.7842V36.2764C49.7331 32.9794 50.3383 29.7051 51.5646 26.6442C52.791 23.5833 54.6139 20.7969 56.9274 18.4472C59.2409 16.0976 61.9986 14.2316 65.0402 12.9579C68.0817 11.6843 71.3462 11.0283 74.6436 11.0283C77.941 11.0283 81.2055 11.6843 84.247 12.9579C87.2885 14.2316 90.0463 16.0976 92.3597 18.4472C94.6732 20.7969 96.4962 23.5833 97.7225 26.6442C98.9489 29.7051 99.5541 32.9794 99.5029 36.2764V76.9754Z" fill="black"/>
					</g>
					<path d="M104.669 58.8643H44.62C42.6995 58.8643 41.1426 60.4211 41.1426 62.3416V98.3722C41.1426 100.293 42.6995 101.85 44.62 101.85H104.669C106.59 101.85 108.146 100.293 108.146 98.3722V62.3416C108.146 60.4211 106.59 58.8643 104.669 58.8643Z" fill="#4A7EEE"/>
					<g opacity="0.5">
					<path d="M80.2433 74.7609C80.2439 73.7185 79.9537 72.6966 79.4053 71.8101C78.8569 70.9237 78.0721 70.2078 77.139 69.743C76.206 69.2782 75.1618 69.083 74.1238 69.1792C73.0859 69.2755 72.0954 69.6594 71.2637 70.2879C70.4321 70.9163 69.7922 71.7644 69.4162 72.7366C69.0402 73.7088 68.9429 74.7667 69.1353 75.7912C69.3276 76.8157 69.802 77.7662 70.5051 78.5358C71.2081 79.3054 72.112 79.8636 73.115 80.1476V88.5268H76.1734V80.1476C77.3467 79.817 78.3797 79.1116 79.1145 78.139C79.8494 77.1663 80.2458 75.98 80.2433 74.7609Z" fill="black"/>
					</g>
					<path d="M44.7148 97.7735C44.5592 97.7735 44.4395 90.5913 44.4395 81.7632C44.4395 72.9351 44.5592 65.7529 44.7148 65.7529C44.8704 65.7529 44.9961 72.9351 44.9961 81.7632C44.9961 90.5913 44.8704 97.7735 44.7148 97.7735Z" fill="#FAFAFA"/>
					<path d="M70.2597 81.9363C70.2597 81.9363 69.9964 81.8525 69.6014 81.5652C69.0477 81.0856 68.8772 80.3202 69.0169 79.5446C69.1565 78.769 69.5892 78.1749 70.1629 77.9217C70.7366 77.6685 71.3607 77.7985 71.6148 78.3221C71.8689 78.8457 71.7395 79.5929 71.2041 79.8461C70.6686 80.0993 70.0355 79.9819 69.6014 79.5446C69.1686 79.1073 69.0928 78.4367 69.2597 77.7802C69.4265 77.1238 69.8361 76.8279 70.2597 76.8279C70.6832 76.8279 70.9671 77.1745 70.9671 77.5743C70.9671 77.974 70.6385 78.1795 70.2597 78.4227C69.8809 78.6659 69.6088 78.7225 69.3091 78.5463C69.0094 78.3701 68.8278 77.9376 68.9603 77.3941C69.0917 76.8506 69.5223 76.6619 69.9153 76.9748C70.3077 77.2877 70.2597 77.9673 70.2597 78.4929C70.2597 78.9541 70.3494 79.1229 70.2597 79.3749Z" fill="#FAFAFA"/>
				</svg>
				`,
				content: `<h2>${evf_upgrade.upgrade_title}</h2><p>${evf_upgrade.upgrade_message}</p>`,
				type: 'red',
				closeIcon: true,
				boxWidth: '400px',
				buttons: {
					confirm: {
						text: evf_upgrade.upgrade_button,
						btnClass: 'btn-confirm',
						keys: ['enter'],
						action: function () {
							window.open(evf_upgrade.upgrade_url, '_blank');
						}
					}
				},
				onOpen: function () {
					var $alertBox = this.$jconfirmBox;



					$alertBox.find('.jconfirm-content > div').css({
						'text-align': 'center',
						'color': '#646464',
						'font-size': '16px',
						'line-height': '26px',
						'font-weight': '400',
					});

					$alertBox.find('.jconfirm-buttons').css({
						'margin-top': '20px',
						'padding': '0',
						'background': 'none',
						'float': 'unset',
					});

					$alertBox.find('.btn-confirm').css({
						'width': '100%',
						'border-radius': '4px',
						'background': '#2563EB',
						'color': '#ffffff',
						'font-size': '16px',
						'font-weight': '600',
						'line-height': '24px',
						'padding': '10px',
					});

					$alertBox.find('.btn-confirm').hover(function () {
						$(this).css('background', '#2f49bc');
					});
				}
			});
		},
		integration_upgrade: function( e ) {
			e.preventDefault();
			if(''=== $(this).find('h3').text()){
				var name = $( this ).text();
			} else {
				var name = $(this).find('h3').text();
			}
			evf_upgrade_actions.upgrade_integration( name , $( this ).data( 'links' ) );
		},
		feature_upgrade: function( e ) {
			e.preventDefault();
			evf_upgrade_actions.upgrade_modal( $( this ).data( 'feature' ) ? $( this ).data( 'feature' ) : $( this ).text() );
		},
		field_upgrade: function( e ) {
			e.preventDefault();
			evf_upgrade_actions.upgrade_modal( $( this ).data( 'feature' ) ? $( this ).data( 'feature' ) : $( this ).text() + ' field', $( this ).data( 'links' ) );
		},
		evf_upgrade_addon:function(e){
			e.preventDefault();
			var fieldType = $(this).data('field-type'),
			fieldPlan = $(this).data('field-plan'),
			addonSlug = $(this).data('addon-slug');
			$.ajax({
				type: 'POST',
				url: evf_upgrade.ajax_url,
				data: {
					action: 'everest_forms_install_and_active_addons',
					field_plan: fieldPlan,
					field_type: fieldType,
					addon_slug: addonSlug,
					security : evf_upgrade.evf_install_and_active_nonce
				},
				success: function(res) {
					if(res.success === true) {
						$.alert( {
							title: res.data.title,
							theme: 'jconfirm-modern jconfirm-everest-forms',
							icon: 'dashicons dashicons-lock',
							backgroundDismiss: false,
							scrollToPreviousElement: false,
							content: res.data.message,
							buttons:{
								confirm:{
									text:res.data.content,
									keys:['enter'],
								},
							},
							type: 'blue',
							boxWidth: '565px',
						} );
					}
					if(res.success === false) {
						$.alert( {
							title: res.data.addon.name + ' ' + evf_upgrade.upgrade_plan_title,
							theme: 'jconfirm-modern jconfirm-everest-forms',
							icon: 'dashicons dashicons-lock',
							backgroundDismiss: false,
							scrollToPreviousElement: false,
							content: evf_upgrade.upgrade_plan_message,
							type: 'red',
							boxWidth: '565px',
							buttons: {
								confirm: {
									text: evf_upgrade.upgrade_plan_button,
									btnClass: 'btn-confirm',
									keys: ['enter'],
									action: function () {
										window.open( evf_upgrade.upgrade_url, '_blank' );
									}
								},
								cancel: {
									text: evf_data.i18n_ok
								}
							}
						} );
					}
				}
			})
		},
		upgrade_modal: function( feature, links = '' ) {
			var message = evf_upgrade.upgrade_message.replace( /%name%/g, feature );
			var boxWidth = '565px';
			if(feature === 'Multiple selection'){
					links = {
					'image_id':'',
					'vedio_id':evf_upgrade.vedio_links.dropdown
				}
			}
			if('' !== links) {
				const {image_id, vedio_id} = links;
				boxWidth = '665px';

				if(vedio_id !== '') {
					var html = '<div><iframe width="600px" height="300px" frameborder="0" src="https://www.youtube.com/embed/'+vedio_id+'" rel="1" allowfullscreen></iframe></div><br>';
				}else{
					var html = '<div width="420" height="315"> <img src="'+image_id+'" /></div>';
				}
				message = html + message;
			}
			$.alert({
				title: feature + ' ' + evf_upgrade.upgrade_title,
				icon: 'dashicons dashicons-lock',
				content: message,
				type: 'red',
				boxWidth: boxWidth,
				buttons: {
					confirm: {
						text: evf_upgrade.upgrade_button,
						btnClass: 'btn-confirm',
						keys: ['enter'],
						action: function () {
							window.open( evf_upgrade.upgrade_url, '_blank' );
						}
					},
					cancel: {
						text: evf_data.i18n_ok
					}
				}
			});
		},
		upgrade_integration: function( name = '',links = '' ) {

			var message = evf_upgrade.upgrade_message.replace( /%name%/g, name );
			boxWidth = '1000px';
			var html = '<div><iframe width="900px" height="600px" frameborder="0" src="https://www.youtube.com/embed/'+links+'" rel="1" allowfullscreen></iframe></div><br>';
			message = html + message;
			$.alert({
				title: name + ' ' + evf_upgrade.upgrade_title,
				icon: 'dashicons dashicons-lock',
				content: message,
				type: 'red',
				boxWidth: boxWidth,
				buttons: {
					confirm: {
						text: evf_upgrade.upgrade_button,
						btnClass: 'btn-confirm',
						keys: ['enter'],
						action: function () {
							window.open( evf_upgrade.upgrade_integration_url, '_blank' );
						}
					},
					cancel: {
						text: ''
					}
				}
			});

		},
		enable_stripe_model: function( e ) {
			e.preventDefault();
			var $button = $('#everest-forms-add-fields-credit-card')
			if($button.hasClass('recurring-payment')){
				return
			}else{
				$.alert({
					title: evf_upgrade.enable_stripe_title,
					content: evf_upgrade.enable_stripe_message,
					icon: 'dashicons dashicons-info',
					type: 'blue',
					buttons : {
						confirm : {
							text: evf_data.i18n_close,
							btnClass: 'btn-confirm',
							keys: ['enter']
						}
					}
				});
			}
		},
		enable_authorize_net_model: function( e ) {
			e.preventDefault();
			$.alert({
				title: evf_upgrade.enable_authorize_net_title,
				content: evf_upgrade.enable_authorize_net_message,
				icon: 'dashicons dashicons-info',
				type: 'blue',
				buttons : {
					confirm : {
						text: evf_data.i18n_close,
						btnClass: 'btn-confirm',
						keys: ['enter']
					}
				}
			});
		},
		enable_square_model : function ( e ){
			e.preventDefault();
			$.alert({
				title: evf_upgrade.enable_square_title,
				content: evf_upgrade.enable_square_message,
				icon: 'dashicons dashicons-info',
				type: 'blue',
				buttons : {
					confirm : {
						text: evf_data.i18n_close,
						btnClass: 'btn-confirm',
						keys: ['enter']
					}
				}
			});
		},
		install_square_addon_notice: function ( e ){
			e.preventDefault();
			console.log(evf_upgrade.admin_url);

			$.alert({
				title: 'Activate Square',
				content: 'Please go to <a href="' + evf_upgrade.admin_url + 'admin.php?page=evf-dashboard#/features" target="__blank">Dashboard</a> to active Square.',
				icon: 'dashicons dashicons-info',
				type: 'blue',
				buttons : {
					confirm : {
						text: evf_data.i18n_close,
						btnClass: 'btn-confirm',
						keys: ['enter']
					}
				}
			});

		},
		evf_one_time_draggable_field: function( e ){
			e.preventDefault();
			$.alert({
				title: evf_upgrade.evf_one_time_draggable_title,
				content: evf_upgrade.evf_one_time_draggable_message,
				icon: 'dashicons dashicons-info',
				type: 'blue',
				buttons : {
					confirm : {
						text: evf_data.i18n_close,
						btnClass: 'btn-confirm',
						keys: ['enter']
					}
				}
			});
		},

		recaptcha_empty_key_validate: function( e ) {
			e.preventDefault();
			$.alert({
				title: evf_upgrade.recaptcha_title,
				content: evf_upgrade.recaptcha_api_key_message,
				icon: 'dashicons dashicons-info',
				type: 'blue',
				buttons : {
					confirm : {
						text: evf_data.i18n_close,
						btnClass: 'btn-confirm',
						keys: ['enter']
					}
				}
			});
		},
		hcaptcha_empty_key_validate: function( e ) {
			e.preventDefault();
			$.alert({
				title: evf_upgrade.hcaptcha_title,
				content: evf_upgrade.hcaptcha_api_key_message,
				icon: 'dashicons dashicons-info',
				type: 'blue',
				buttons : {
					confirm : {
						text: evf_data.i18n_close,
						btnClass: 'btn-confirm',
						keys: ['enter']
					}
				}
			});
		},
		turnstile_empty_key_validate: function( e ) {
			e.preventDefault();
			$.alert({
				title: evf_upgrade.turnstile_title,
				content: evf_upgrade.turnstile_api_key_message,
				icon: 'dashicons dashicons-info',
				type: 'blue',
				buttons : {
					confirm : {
						text: evf_data.i18n_close,
						btnClass: 'btn-confirm',
						keys: ['enter']
					}
				}
			});
		},
	};

	evf_upgrade_actions.init();
});
